import { useSwiper } from "swiper/react";

const SlideNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div
      style={{
        border: "2px solid #e5e7eb", // border-gray-200 equivalent
        display: "flex",
        alignItems: "center",
        paddingLeft: "8px",
        paddingRight: "8px",
        paddingTop: "4px",
        paddingBottom: "4px",
        borderRadius: "12px",
        marginTop: "16px",
        gap: "16px", // space-x-4 equivalent
      }}
    >
      <button
        style={{
          backgroundColor: "#93c5fd", // bg-blue-300 equivalent
          padding: "4px",
          borderRadius: "8px",
        }}
        onClick={() => swiper.slidePrev()}
      >
        Prev
      </button>
      <button
        style={{
          backgroundColor: "#93c5fd", // bg-blue-300 equivalent
          padding: "4px",
          borderRadius: "8px",
        }}
        onClick={() => swiper.slideNext()}
      >
        Next
      </button>
    </div>
  );
};

export default SlideNavButtons;
