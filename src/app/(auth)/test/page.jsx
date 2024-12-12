import CustomSlider1 from "./components/CustomSlider1";

const SliderPage = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        marginLeft: "16px",
        marginRight: "16px",
        padding: "16px",
      }}
    >
      <h1>Slider page</h1>
      <br />

      {/* Slider Component */}
      <CustomSlider1 />
    </div>
  );
};

export default SliderPage;
