
const name=""


const initialState = {
  name: name || "",
  isLoginName: name ? true : false,
};



const NameReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_NAME":

      // console.log("logred>>", action.token)
      return {
        ...state,
        name: action.token,
        isLoginName: action.name ? true : false,
      };
    default:
      return state;
  }
};

export default NameReducer;




