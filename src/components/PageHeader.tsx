import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainerFast } from '@/shared';

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

      <motion.div
        className="mb-12 pt-8"
        variants={staggerContainerFast}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-(--color-text) flex items-center gap-4 mb-3"
          variants={fadeInUp}
        >
          {icon && <span className="text-(--color-primary)">{icon}</span>}
          {title}
        </motion.h1>
        {description && (
          <motion.p className="text-lg text-(--color-body)" variants={fadeInUp}>
            {description}
          </motion.p>
        )}
      </motion.div>
    </>
  );
};

export default PageHeader;
