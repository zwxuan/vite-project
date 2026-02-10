import { AdvancedSearchFormProps } from '@/components/search-form';
import i18n from '@/i18n';
import { ArchiveManagementLocale } from '@/utils/locale/customs_compliance/supporting_documents_management/archive_management';

export const getFields = (): AdvancedSearchFormProps['fields'] => [
  {
    type: 'input',
    label: i18n.t(ArchiveManagementLocale.getSearchPreEntryNo()),
    key: 'preEntryNo',
  },
  {
    type: 'input',
    label: i18n.t(ArchiveManagementLocale.getSearchDeclarationNo()),
    key: 'declarationNo',
  },
  {
    type: 'input',
    label: i18n.t(ArchiveManagementLocale.getSearchClientName()),
    key: 'clientName',
  },
  {
      type: 'dateRange',
      label: i18n.t(ArchiveManagementLocale.getSearchArchiveDate()),
      key: 'dateRange',
  }
];
