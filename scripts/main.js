let svg = null;

const data = {
  children: Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    value: Math.random() < .8 ? 5 : 20,
  }))
}

const getPack = (size, padding = 20) => {
  const flatNodeHeirarchy = d3.hierarchy(data).sum(d => d.value);
  const packedData = d3.pack()
    .size([ size, size ])
    .padding(padding)
    (flatNodeHeirarchy);
  return packedData;
}

const init = () => {
  const packedData = getPack(200, 1);
  const size = 930;

  //Create SVG element
  svg = d3.select('body')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', [0, 0, size, size]);

  packedData.children.forEach((elem) => {
    const circle = createCircle(elem.data.id);
    updateCircle(circle, elem.r, elem.x, elem.y + 300, elem.data.value);
  });
}

const repack = () => {
  data.children = [
    ...data.children,
    ...Array.from({ length: Math.floor(data.children.length / 2) }).map((_, index) => ({
      id: index + data.children.length,
      value: 2,
    }))
  ];

  const packedData = getPack(600, 20);

  packedData.children.forEach((elem) => {
    let circle = svg.select(`[data-id="${elem.data.id}"]`);
    if(circle.empty()) {
      circle = createCircle(elem.data.id);
    }

    updateCircle(circle, elem.r, elem.x + 300, elem.y, elem.data.value);
  });
}

const createCircle = (id) => {
  return svg.append('circle')
    .attr('style', `transition: all 2s ${Math.floor(Math.random() * 200)}ms ease-in-out`)
    .attr('data-id', id);
}

const updateCircle = (circle, r, x, y, value) => {
  circle.attr('r', r)
    .attr('transform', `translate(${x}, ${y})`)
    .attr('fill', value === 5 ? '#673ab7' : '#e91e63');
}

init();

document.body.addEventListener('click', repack);