import { ClipLoader } from "react-spinners";

export default function LoadingContent() {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader
        color="#fff"
        size={100}
        speedMultiplier={2}
      />
    </div>
  )
}