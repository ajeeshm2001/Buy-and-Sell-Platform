const setAlertTimer = (state) => {
    state(true);
    setTimeout(() => {
        state(false);
    },3000)
  }

  export {
    setAlertTimer
  }