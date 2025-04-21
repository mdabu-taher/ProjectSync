// client/src/components/AssignmentsTable.jsx
import { useEffect, useState, useRef } from 'react';

export default function AssignmentsTable() {
  const [data, setData]       = useState([]);
  const [sortKey, setSortKey] = useState('start_date');
  const [asc, setAsc]         = useState(false);
  const timer = useRef();

  // Define columns: key, label, and how to extract the value
  const columns = [
    {
      key:   'employee_id',
      label: 'Employee ID',
      accessor: item => item.employee_id.employee_id
    },
    {
      key:   'full_name',
      label: 'Employee Name',
      accessor: item => item.employee_id.full_name
    },
    {
      key:   'project_name',
      label: 'Project Name',
      accessor: item => item.project_code.project_name
    },
    {
      key:   'start_date',
      label: 'Start Date',
      accessor: item => new Date(item.start_date)
    }
  ];

  // Fetch latest 5 assignments
  const fetchData = async () => {
    try {
      const res = await fetch('/api/project_assignments');
      if (!res.ok) throw new Error(await res.text());
      setData(await res.json());
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
    timer.current = setInterval(fetchData, 60_000);
    return () => clearInterval(timer.current);
  }, []);

  // Sort data using the selected column’s accessor
  const sorted = [...data].sort((a, b) => {
    const col = columns.find(c => c.key === sortKey);
    if (!col) return 0;
    let av = col.accessor(a);
    let bv = col.accessor(b);

    // For dates, compare directly; for strings, toLowerCase
    if (av instanceof Date) {
      av = av.getTime();
      bv = bv.getTime();
    } else {
      av = av.toString().toLowerCase();
      bv = bv.toString().toLowerCase();
    }

    return (av > bv ? 1 : -1) * (asc ? 1 : -1);
  });

  const onHeaderClick = (key) => {
    if (sortKey === key) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(true);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              onClick={() => onHeaderClick(col.key)}
              style={{ cursor: 'pointer' }}
            >
              {col.label}{' '}
              {sortKey === col.key ? (asc ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map(item => (
          <tr key={item._id}>
            {columns.map(col => (
              <td key={col.key}>
                {col.key === 'start_date'
                  ? col.accessor(item).toLocaleDateString()
                  : col.accessor(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
