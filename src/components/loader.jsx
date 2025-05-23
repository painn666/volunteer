import { InfinitySpin } from "react-loader-spinner";
function Loader() {
  return (
    <InfinitySpin
      visible={true}
      width="100"
      color="var(--misc)"
      ariaLabel="infinity-spin-loading"
    />
  );
}

export default Loader;
