import { Modal, Button, Loading } from '@/components';
import { useBrand } from '@/queries/useBrand';

interface BrandModelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandId: string | null;
}

const BrandModelsModal: React.FC<BrandModelsModalProps> = ({
  isOpen,
  onClose,
  brandId,
}) => {
  const { brandByIdQuery } = useBrand(brandId);
  const { data: brandResponse, isLoading } = brandByIdQuery;
  const brand = brandResponse?.data;
  const models = brand?.car_models || [];

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={brand ? `${brand.name} Models` : 'Loading Models...'}
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {models.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="p-3 bg-(--color-background) rounded-lg border border-(--color-border) flex items-center justify-between"
                  >
                    <span className="font-medium text-(--color-text)">
                      {model.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-(--color-body)">
                <p>No models found for this brand.</p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BrandModelsModal;
