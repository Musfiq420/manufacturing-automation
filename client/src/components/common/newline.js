import React from 'react'

const Newline = ({line}) => {
  return newLineFunc()


  function newLineFunc () {
    const rows = []
    for (let index = 0; index < line; index++) {
        rows.push(<br />);
    }
    return rows;
  }
}



export default Newline