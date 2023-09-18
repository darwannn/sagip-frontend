interface Window {
  AndroidInterface: AndroidInterface;
}

interface AndroidInterface {
  playSOS: () => void;
  stopSOS: () => void;
  showToast: (toastMessage: string) => void;
  startSharingLocation: (headToken: string, residentUserId: string) => void;
  stopSharingLocation: () => void;
  routeTo: (latitude: string, longitude: string) => void;
  setMediaChooser: (option: string) => void;
  updateFcmToken: (userId: string | null | undefined) => void;
  vibrateOnHold: () => void;
}
