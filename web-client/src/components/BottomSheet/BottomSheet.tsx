import { useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

type TProp = {
  component: JSX.Element;
  snapPoints: number[];
  headerStyle: string;
  contentStyle: string;
  showBottomSheet: boolean;
  setShowBottomSheet: (value: boolean) => void;
  isBackdropShown: boolean;
};
const BottomSheet = ({
  component,
  snapPoints,
  headerStyle,
  contentStyle,
  showBottomSheet,
  setShowBottomSheet,
  isBackdropShown,
}: TProp) => {
  const sheetRef = useRef<SheetRef>();

  /* const snapTo = (i: number) => sheetRef.current?.snapTo(i); */
  return (
    <>
      <Sheet
        ref={sheetRef}
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        snapPoints={snapPoints}
        initialSnap={0}
        onSnap={(snapIndex: number) => console.log(snapIndex)}
        detent="content-height"
      >
        <Sheet.Container
          style={{
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          }}
        >
          <Sheet.Header className={headerStyle} />
          <Sheet.Content className={contentStyle}>{component}</Sheet.Content>
        </Sheet.Container>
        {isBackdropShown ? (
          <Sheet.Backdrop />
        ) : (
          <Sheet.Backdrop className="hidden" />
        )}
      </Sheet>
    </>
  );
};

export default BottomSheet;
