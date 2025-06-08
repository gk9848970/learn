export const RightToLeft = () => {
  return (
    <div>
      <p
        style={{
          background: "pink",
          padding: "20px",
          paddingInlineStart: "60px",
        }}
        dir="ltr"
      >
        This paragraph is in English and correctly goes left to right.
      </p>

      <p
        style={{
          background: "pink",
          padding: "20px",
          paddingInlineStart: "60px",
        }}
        dir="rtl"
      >
        هذه الفقرة باللغة العربية ، لذا يجب الانتقال من اليمين إلى اليسار.
      </p>
    </div>
  );
};
