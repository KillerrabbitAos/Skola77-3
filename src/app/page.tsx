"use client";

export default function Home() {
  const renderContent = () => {
    return (
      <>
        <div className={"mx-1"}>Dev</div>
        <button
          onClick={() => (window.location.href = "/groups")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition mx-1"
        >
          Go to Groups
        </button>
        <button
          onClick={() => (window.location.href = "/settings")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
        >
          Go to Settings
        </button>
      </>
    );
  };

  return <div className="bg-background">{renderContent()}</div>;
}
