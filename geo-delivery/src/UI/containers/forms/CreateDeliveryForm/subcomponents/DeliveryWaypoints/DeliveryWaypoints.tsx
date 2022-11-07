import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form } from 'UI';

const defaultAutoRows = [uuid()];

const DeliveryWaypoints = () => {
  const [waypoints, setWaypoints] = useState<string[]>(defaultAutoRows);

  const handleAddRow = (id: string) => {
    const newRows = [...waypoints];
    const clickedRowIndex = newRows.findIndex((item) => item === id);
    newRows.splice(clickedRowIndex, 0, uuid());
    setWaypoints(newRows);
  };

  const handleRemoveRow = (id: string) => {
    const newRows = [...waypoints];
    const clickedRowIndex = newRows.findIndex((item) => item === id);
    newRows.splice(clickedRowIndex, 1);
    setWaypoints(newRows);
  };

  return (
    <Form.Block title="Промежуточные города (необязательно)">
      {waypoints.map((id, index) => (
        <Form.Row
          key={id}
          showAdd
          showRemove={waypoints.length > 1}
          handleAdd={() => handleAddRow(id)}
          handleRemove={() => handleRemoveRow(id)}
        >
          <Form.Field
            label="Город"
            name={`waypoints[${index}].city`}
            type="city"
          />
          <Form.Field
            name={`waypoints[${index}].arrive`}
            type="date"
          />
          <Form.Field
            name={`waypoints[${index}].departure`}
            type="date"
          />
        </Form.Row>
      ))}
    </Form.Block>
  );
};

export { DeliveryWaypoints };