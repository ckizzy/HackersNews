export default function Header({ handleRefresh }) {
  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
