import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface Row extends CrudRow {
  name: string;
  location: string;
  startDate: string;
}

const EventsTable = () => {
  const { t, i18n } = useTranslation(['event']);
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: t('event:list.name'),
      flex: 1,
    },
    {
      field: 'location',
      headerName: t('event:list.location'),
      flex: 1,
    },
    {
      field: 'startDate',
      headerName: t('event:list.start_date'),
      flex: 1,
      renderCell: (params) => dayjs(params.row.startDate).format('DD/MM/YYYY hh:mm'),
    },
  ];

  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  const itemToRow = (item: Event): Row => {
    return {
      id: item.id,
      name: item.name,
      location: item.location,
      startDate: item.startDate,
    };
  };

  return (
    <ItemsTable<Event, CreateOneInput, UpdateOneInput, Row>
      namespace={Namespaces.Events}
      routes={Routes.Events}
      useItems={useEvents}
      columns={translatedColumns}
      itemToRow={itemToRow}
      showEdit={() => true}
      showDelete={() => true}
      exportable
    />
  );
};

export default EventsTable;
