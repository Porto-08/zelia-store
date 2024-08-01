import { ClipLoader } from "react-spinners";

export default function LoadingContent() {
  return (
    <div className="flex justify-center items-center mt-8">
      <ClipLoader
        color="#fff"
        size={100}
        speedMultiplier={4}
      />
    </div>
  )
}