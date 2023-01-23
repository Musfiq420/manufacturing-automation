const ProgressBar = (props) => {
    const { bgcolor, completed, caption } = props;
  
    const containerStyles = {
      height: 20,
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 5
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed<100?completed:100}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
    //   fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${caption} ${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;