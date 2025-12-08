import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  browserTitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  browserTitle,
}) => {
  const pageTitle = browserTitle || title;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Xdrive Admin</title>
      </Helmet>

      <div className="mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-(--color-text) flex items-center gap-4 mb-3">
          {icon && <span className="text-(--color-primary)">{icon}</span>}
          {title}
        </h1>
        {description && (
          <p className="text-lg text-(--color-body)">{description}</p>
        )}
      </div>
    </>
  );
};

export default PageHeader;
