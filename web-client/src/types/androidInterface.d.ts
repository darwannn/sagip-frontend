interface Window {
  AndroidInterface: AndroidInterface;
}

interface AndroidInterface {
  playSOS: () => void;
  stopSOS: () => void;
  showToast: (toastMessage: string) => void;
  startSharingLocation: (
    headToken: string,
    residentUserId: string,
    assistanceReqId: string
  ) => void;
  stopSharingLocation: () => void;
  routeTo: (latitude: number, longitude: number) => void;
  setMediaChooser: (option: string) => void;
  updateFcmToken: (userId: string | null | undefined) => void;
  removeFcmToken: () => void;
  vibrateOnHold: () => void;
  isCameraEnabled: () => boolean;
  isLocationEnabled: (userType: string) => boolean;
}
