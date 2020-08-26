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
  // svgElem = document.createElement('svg');
  // svgElem.setAttribute('width', `${size}`);
  // svgElem.setAttribute('height', `${size}`);
  svg = d3.create("svg")
    .attr("viewBox", [0, 0, size, size])
    .style("width", "100%")
    .style("height", "auto");
  document.body.appendChild(svg.node());

  //const svg = d3.select(svgElem)

  packedData.children.forEach((elem) => {
    const circle = createCircle(elem.data.id);
    updateCircle(circle, elem.r, elem.x, elem.y + 300, elem.data.value);
  });

  // document.body.innerHTML = document.body.innerHTML;
}

const repack = () => {

  data.children = [
    ...data.children,
    ...Array.from({ length: Math.floor(data.children.length / 2) }).map((_, index) => ({
      id: index + data.children.length,
      value: 2,
    }))
  ];

  const packedData = getPack(900, 20);
  console.log(packedData);

  packedData.children.forEach((elem) => {
    let circle = document.querySelector(`[data-id="${elem.data.id}"]`);
    if(!circle) {
      circle = createCircle(elem.data.id);
    }

    updateCircle(circle, elem.r, elem.x + 400, elem.y, elem.data.value);
    //console.log(circle);
    
    // circle.setAttribute('fill', 'red');
  });
  //document.body.innerHTML = document.body.innerHTML;

}

const createCircle = (id) => {
  const circle = document.createElement('circle');
  circle.setAttribute('style', `transition: all 2s ${Math.floor(Math.random() * 200)}ms ease-in-out`);
  circle.setAttribute('data-id', id);
  svg.append(circle);
  //.appendChild(circle);
  return circle;
}

const updateCircle = (circle, r, x, y, value) => {
  circle.setAttribute('r', r);
  circle.setAttribute('transform', `translate(${x}, ${y})`);
  circle.setAttribute('fill', value === 5 ? '#673ab7' : '#e91e63');
}

init();

document.body.addEventListener('click', repack);