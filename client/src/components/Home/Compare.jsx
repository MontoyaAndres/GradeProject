import React from 'react';

const Compare = ({ selected }) => <h1>{selected.map(x => <span>{x}</span>)}</h1>;

export default Compare;
