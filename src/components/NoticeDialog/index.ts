import { createVNode, render } from 'vue';
import Index from './Index.vue';

export default ({  title, content, btnWords,submitType,  visible = true, showClose = true,}) => {
  const mask = document.createElement('div');
  document.body.appendChild(mask);
  return new Promise((reslove, reject) => {
    const submit = () => {
      render(null, mask);
      mask.remove();
      reslove(true);
    };
    const closeDialog = () => {
      render(null, mask);
      mask.remove();
      reject();
    };
    const VNode = createVNode(Index, {
      title,
      btnWords,
      submitType,
      visible,
      showClose,
      content,
      submit,
      closeDialog
    });
    render(VNode, mask);
  });
};
