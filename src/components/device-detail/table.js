import React from "react";
import PropTypes from "prop-types";

const Table = ({ column, dataSource }) => {
  let row = [];
  let rows = [];
  dataSource &&
    dataSource.forEach((item, index) => {
      if ((index + 1) % column != 0) {
        // 每 column 列为一行，index 以1开始
        row.push(item);
      } else {
        row.push(item);
        rows.push(row);
        row = [];
      }
    });

  return (
    <table style={{ width: "100%",border:"1"}}>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map(item => (
              <React.Fragment key={item.key}>
                <td key={item.key}>{item.label}:</td>
                <td key={item.value}>{item.value}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  column: PropTypes.number, // 多少列为一行
  dataSource: PropTypes.array
};

// item { label: '', key: '', value: '' }

export default Table;
