const get_canvas_by_id = (id, contextType = "2d") => {
  const canvas = document.getElementById(id);
  if(canvas.getContext) {
    const ctx = canvas.getContext(contextType);
    return [canvas, ctx];
  } else  {
    return []
  }
}

const set_fill = (ctx, fillStyle) => {
  ctx.fillStyle = fillStyle;
}

const set_stroke = (ctx, strokeStyle) => {
  ctx.strokeStyle = strokeStyle;
}

const set_global_alpha = (ctx, alpha) => {
  ctx.globalAlpha = alpha;
}

const RECT_MODES = {fill: "FILL", stroke: "STROKE", clear: "CLEAR"}

const draw_rect = (ctx, x, y, w, h, mode = RECT_MODES.fill) => {
  switch(mode) {
    case RECT_MODES.fill:
      ctx.fillRect(x,y,w,h);
      break;
    case RECT_MODES.stroke:
      ctx.strokeRect(x,y,w,h);
      break;
    case RECT_MODES.clear:
      ctx.clearRect(x,y,w,h);
      break;
    default:
      console.warn(`Unknown DRAW_MODE: ${mode}`);
  }
}

const resize_canvas = (canvas, h, w) => {
  canvas.height = h;
  canvas.width = w;
}

const cls = (ctx, h, w) => {
  draw_rect(ctx, 0, 0, w, h, RECT_MODES.clear);
}

const draw_arc = (ctx, x, y, r, startAngle, endAngle, strokeStyle=null, fillStyle=null) => {
  ctx.beginPath();

  if(strokeStyle) { set_stroke(ctx, strokeStyle); }
  if(fillStyle) { set_fill(ctx, fillStyle); }

  ctx.arc(x,y,r,startAngle, endAngle);

  if(fillStyle) { ctx.fill();}
  if(strokeStyle) {ctx.stroke();}

  ctx.closePath();
}

const draw_circle = (ctx, x, y, r, strokeStyle=null, fillStyle=null) => {
  draw_arc(ctx, x, y, r, 0, 2 * Math.PI, strokeStyle, fillStyle);
}


const animation_loop = (callback) => {
  let previousTime = 0;
  let frameCount = 0;
  let stop = false;

  const halt = () => {
    console.warn("halting animation");
    stop = true;
  }

  const wrapper = (timestamp) => {
    if(stop) { return; }
    if(previousTime === 0) { previousTime = timestamp; }
    const deltaT = timestamp - previousTime;
    previousTime = timestamp;
    frameCount++;
    callback(deltaT, frameCount, halt);
    window.requestAnimationFrame(wrapper);
  }
  window.requestAnimationFrame(wrapper)
}
