import { useToast } from '@chakra-ui/react';

interface IUseNotifications {
  notifySuccess: (title: string, description: string) => void;
  notifyError: (title: string, description: string) => void;
}
export function useNotifications(): IUseNotifications {
  const toastMaker = useToast({
    isClosable: true,
    position: 'bottom',
    duration: 2000,
  });

  const notifySuccess = (title: string, description: string) => {
    toastMaker({
      title,
      description,
      status: 'success',
    });
  };

  const notifyError = (title: string, description: string) => {
    toastMaker({
      title,
      description,
      status: 'error',
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
