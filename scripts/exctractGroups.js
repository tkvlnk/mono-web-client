const groups = [
  // eslint-disable-next-line no-undef
  ...document.querySelectorAll('a[href^="https://mcc-codes.ru/code/"]')
].reduce((result, node) => {
  const groupNode = node.closest('.list-group-item');
  const name = groupNode
    .querySelector('.h5.mb-1')
    ?.childNodes[0].textContent.trim();

  if (!name) {
    return result;
  }

  if (!result[name]) {
    const imageUrl = groupNode.querySelector('img').src;

    const imageName = imageUrl.split('/').pop();

    result[name] = {
      mccs: [],
      name,
      image: {
        url: imageUrl,
        name: imageName
      }
    };
  }

  result[name].mccs.push(Number(node.textContent));

  return result;
}, {});

const json = JSON.stringify(groups, null, 4);

// eslint-disable-next-line no-console
console.log(json);
