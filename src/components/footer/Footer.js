function Footer() {
  return (
    <div className="w-full py-4 flex justify-center items-center bg-blue-600">
      <div className="ads-container w-full max-w-md h-24 flex justify-center items-center">
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client="ca-pub-xxxxxxxxxxxx"
          data-ad-slot="xxxxxxxxxx"
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
          광고 삽입 위치
        </ins>
      </div>
    </div>
  );
}

export default Footer;
