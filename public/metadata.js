export const products = {
  url: 'http://localhost:5173/products',
  fields: [],
  buttons: [
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-earthen-bottle-1-btn',
      selector: '#product-earthen-bottle-1-btn',
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-nomad-tumbler-2-btn',
      selector: '#product-nomad-tumbler-2-btn',
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-focus-paper-refill-3-btn',
      selector: '#product-focus-paper-refill-3-btn',
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-machined-mechanical-pencil-4-btn',
      selector: '#product-machined-mechanical-pencil-4-btn',
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-basic-tee-6-pack-5-btn',
      selector: '#product-basic-tee-6-pack-5-btn',
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-basic-5-pack-socks-6-btn',
      selector: '#product-basic-5-pack-socks-6-btn',
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Add to Cart',
      id: 'product-basic-coastal-cap-7-btn',
      selector: '#product-basic-coastal-cap-7-btn',
    },
  ],
};

export const formFilling = {
  url: 'http://localhost:5173/form',
  fields: [
    {
      tag: 'input',
      type: 'text',
      name: 'title',
      id: 'title',
      placeholder: 'Title of your story...',
      selector: '#title',
    },
    {
      tag: 'textarea',
      type: 'textarea',
      name: 'details',
      id: 'details',
      placeholder: 'Details of your story...',
      selector: '#details',
    },
  ],
  buttons: [
    {
      tag: 'button',
      type: 'submit',
      text: 'Post',
      id: 'postStoryButton',
      selector: '#postStoryButton',
    },
  ],
};
