import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination totalItems={100} pageSize={10} currentPage={10} />
    </div>
  );
}
