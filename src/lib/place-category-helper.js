export default type => {
  switch (type) {
    case "artesanato":
      return {
        icon: "mdi-hand-heart",
        color: "brown"
      };
    case "alimento":
      return {
        icon: "mdi-food-variant",
        color: "#D81159"
      };
    case "hospedagem":
      return {
        icon: "mdi-sleep",
        color: "#FFBC42"
      };
    case "terapêuticos":
      return {
        icon: "mdi-cross",
        color: "blue"
      };
    case "atração":
      return {
        icon: "mdi-waves",
        color: "#218380"
      };
    case "bar":
      return {
        icon: "mdi-beer",
        color: "#8F2D56"
      };
    case "wifi":
      return {
        icon: "mdi-wifi",
        color: "#8F2D56"
      };
    default:
      break;
  }
};
