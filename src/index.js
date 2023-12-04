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
  ctx.strokeStyle = stokeStyle;
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
      console.warn(`Unknown RECT_MODE: ${mode}`);
  }
}

const resize_canvas = (canvas, h, w) => {
  canvas.height = h;
  canvas.width = w;
}


const animation_loop = (callback) => {
  let previousTime = 0;
  let frameCount = 0;
  const wrapper = (timestamp) => {
    if(previousTime === 0) {
      previousTime = timestamp;
    }
    const deltaT = timestamp - previousTime;
    previousTime = timestamp;
    frameCount++;
    callback(deltaT, frameCount);
    window.requestAnimationFrame(wrapper);
  }
  window.requestAnimationFrame(wrapper)
}
