
// 设置主题
export function changeThemeValue(val?: any) {
  const classes = document.getElementsByTagName('html')[0].className;
  let classArr = [];
  if (classes) {
    classArr = classes.split(' ');
  }
  let keys = ['root-theme-light'];
  classArr = classArr.filter(i => !keys.includes(i));
  classArr.push('root-theme-light');
  document.getElementsByTagName('html')[0].className = classArr.join(' ');
};

// 根据状态，初始化顶部距离
export function initHeightFromTop(status, showTags, showAppTopBar) {
  if(!status) {
    document.documentElement.style.setProperty('--height-from-top', '0px');
  } else {
    if(showTags && showAppTopBar) {
      document.documentElement.style.setProperty('--height-from-top', '100px');
    } else if(showTags && !showAppTopBar){
      document.documentElement.style.setProperty('--height-from-top', '40px');
    } else if(!showTags && showAppTopBar){
      document.documentElement.style.setProperty('--height-from-top', '60px');
    }
  }
}