import {
  createContext,
  useCallback,
  type ReactNode,
  useState,
  useContext,
} from 'react';

interface EditImagesContextValue {
  imagesToDelete: string[];
  addImageToDelete: (image: string) => void;
  removeImageToDelete: (image: string) => void;
}

interface EditImagesContextProviderProps {
  children: ReactNode;
}

const EditImagesContext = createContext<EditImagesContextValue | null>(null);

export const EditImageContextProvider = ({
  children,
}: EditImagesContextProviderProps) => {
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const addImageToDelete = useCallback(
    (image: string) => {
      const state = imagesToDelete;
      state.push(image);
      setImagesToDelete(state);
    },
    [imagesToDelete],
  );

  const removeImageToDelete = useCallback((image: string) => {
    setImagesToDelete(prev => prev.filter(img => img !== image));
  }, []);

  return (
    <EditImagesContext.Provider
      value={{ imagesToDelete, addImageToDelete, removeImageToDelete }}
    >
      {children}
    </EditImagesContext.Provider>
  );
};

export const useEditImagesContext = () => {
  const ctx = useContext(EditImagesContext);
  if (!ctx)
    throw new Error(
      'useEditImagesContext must be used inside EditImagesContextProvider',
    );
  return ctx;
};
