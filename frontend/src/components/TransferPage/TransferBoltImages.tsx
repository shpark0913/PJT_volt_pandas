import React, {useState} from 'react';
import {TransferImageDetailContainer, TransferImagesDetailWrapper} from "./TransferTabComponents";
import {TransferBoltImage, TransferImageGrid, TransferImageGridContainer} from "./TransferImageComponents";
import {Button, RedButton, SemesButton} from "../ButtonComponents";
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {CloseButton} from "../Modal/ModalComponents";
// import useTransferBoltImages from "../../_hooks/useTransferBoltImages";
import TransferButtons from "./TransferButtons";

function TransferBoltImages({tabIndex, BoltImageLists, isDetailOpen, setIsDetailOpen}:
                              { tabIndex: number,
                                BoltImageLists: TransferLoaderType[],
                                isDetailOpen: boolean,
                                // setIsDetailOpen: (arg: (prev:boolean) => boolean) => void,
                                setIsDetailOpen: (arg: boolean) => void }) {

  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const [detailInfo, setDetailInfo] = useState<TransferBoltImageObject>({
    imgUrl: "",
    originName: "",
    fileId: 0
  })
  const [selected, setSelected] = useState<TransferBoltImageObject[][]>([[], [], []]);
  // const { TransferClass } = useTransferBoltImages();
  const { TransferClassButton } = TransferButtons();
  const ButtonLists: JSX.Element[] = [<>
    { selected[0].length && TransferClassButton(0, 1, selected[0].map(d => d.fileId)) }
    {/*{ selected[0].length && <Button onClick={ () => TransferClass(0, 1, selected[0].map(d => d.fileId)) }>유실로 이동</Button>}*/}
    { selected[0].length && TransferClassButton(0, 2, selected[0].map(d => d.fileId)) }
    <SemesButton>학습으로 이동</SemesButton>
    <RedButton>삭제하기</RedButton>
  </>, <>
    { selected[1].length && TransferClassButton(1, 0, selected[1].map(d => d.fileId)) }
    {/*{ selected[1].length && <Button onClick={ () => TransferClass(1, 0, selected[1].map(d => d.fileId)) }>양호로 이동</Button>}*/}
    { selected[1].length && TransferClassButton(1, 2, selected[1].map(d => d.fileId)) }
    {/*<Button>풀림으로 이동</Button>*/}
    <SemesButton>학습으로 이동</SemesButton>
    <RedButton>삭제하기</RedButton>
  </>, <>
    <Button>양호로 이동</Button>
    <Button>유실로 이동</Button>
    <SemesButton>학습으로 이동</SemesButton>
    <RedButton>삭제하기</RedButton>
  </>, <>
    <Button>양호로 이동</Button>
    <Button>유실로 이동</Button>
    <Button>풀림으로 이동</Button>
    <RedButton>삭제하기</RedButton>
  </>];
  const BoltImageElement = BoltImageLists.map((data) =>
        <>
          {data.images.map((image) =>
            <TransferBoltImage key={`bolt_images-${image.fileId}`} >
              <input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.checked);
                if (e.target.checked) {
                  setSelected(prev => {
                    const tmp = [...prev];
                    tmp[data.status] = [...tmp[data.status], image];
                    return tmp;
                  })
                }
                else {
                  setSelected(prev => {
                    const tmp = [...prev];
                    tmp[data.status] = tmp[data.status].filter((tmpData) => tmpData.fileId !== image.fileId);
                    return tmp;
                  })
                }
              }} />
              <div onClick={() => {
                // setIsDetailOpen(prev => prev = !prev);
                setIsDetailOpen(true);
                setDetailInfo({imgUrl: image.imgUrl, originName: image.originName, fileId: image.fileId})
              } }>
                <img src={`${IMG_URL}/${image.imgUrl}`} alt="bolt" />
                <div >
                  {image.originName}
                </div>
              </div>
            </TransferBoltImage>
          )}
        </>
  )


  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <label>전체 선택 <input type="checkbox" /></label>
      <TransferImagesDetailWrapper>
        <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
          <TransferImageGrid className={isDetailOpen? "active open" : "open"}>
            {BoltImageElement[tabIndex]}
          </TransferImageGrid>
        </TransferImageGridContainer>
        <TransferImageDetailContainer className={isDetailOpen? "active" : ""}>
          <CloseButton onClick={() => setIsDetailOpen(false)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
          <img src={`${IMG_URL}/${detailInfo.imgUrl}`} alt="bolt detail"/>
          <div>{detailInfo.originName}</div>
        </TransferImageDetailContainer>
      </TransferImagesDetailWrapper>
      <div>
        { ButtonLists[tabIndex] }
        <div>현재 선택 : 1/100</div>
      </div>
    </div>
  );
}

export default TransferBoltImages;