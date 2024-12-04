let doc: any
doc = document

// 进入全屏
export function enterFullScreen(element: any) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

// 退出全屏
export function exitFull() {
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  }
}

// 当前处于全屏的元素
export function checkFullScreen() {
  return doc.fullscreenElement || doc.msFullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || null;
}

// 当前是否处于全屏
export function isFullScreen() {
  return !!checkFullScreen();
}

export function toggle(element: Element) {
  isFullScreen() ? exitFull() : enterFullScreen(element);
}