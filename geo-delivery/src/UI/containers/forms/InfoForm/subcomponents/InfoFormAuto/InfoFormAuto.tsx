import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form } from 'UI';

const defaultAutoRows = [uuid()];

const InfoFormAuto = () => {
  const [autoRows, setAutoRows] = useState<string[]>(defaultAutoRows);

  const handleAddRow = (id: string) => {
    const newRows = [...autoRows];
    const clickedRowIndex = newRows.findIndex((item) => item === id);
    newRows.splice(clickedRowIndex, 0, uuid());
    setAutoRows(newRows);
  };

  const handleRemoveRow = (id: string) => {
    const newRows = [...autoRows];
    const clickedRowIndex = newRows.findIndex((item) => item === id);
    newRows.splice(clickedRowIndex, 1);
    setAutoRows(newRows);
  };

  return (
    <Form.Block title="Рабочие автомобили">
      {autoRows.map((id, index) => (
        <Form.Row
          key={id}
          showAdd
          showRemove={autoRows.length > 1}
          handleAdd={() => handleAddRow(id)}
          handleRemove={() => handleRemoveRow(id)}
        >
          <Form.Field
            label="Модель*"
            multiline
            name={`auto[${index}].model`}
          />
          <Form.Field
            label="Груз, кг"
            multiline
            type="number"
            name={`auto[${index}].capacity`}
          />
          <Form.Field
            label="Мест"
            multiline
            type="number"
            name={`auto[${index}].passengers`}
          />
        </Form.Row>
      ))}
    </Form.Block>
  );
};

export { InfoFormAuto };