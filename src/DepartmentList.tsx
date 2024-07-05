import React, { useState } from 'react';
import { Checkbox, Container, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  department: string;
  sub_departments: string[];
}

const departmentData: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
  {
    department: 'Agriculture & Fishing (5)',
    sub_departments: ['Crops', 'Agriculture', 'Fishery & Aquaculture', 'Farming Animals & Livestock', 'Ranching'],
  },
  {
    department: 'Business Services (25)',
    sub_departments: [
      'Accounting & Accounting Services',
      'Auctions',
      'Business Services - General (2)',
      'Call Centers & Business Centers',
      'Career Planning',
      'Career',
      'Commercial Printing',
      'Debt Collection',
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set());

  const handleExpandClick = (department: string) => {
    setExpanded(expanded === department ? null : department);
  };

  const handleSelectDepartment = (department: string) => {
    const updatedSelection = new Set(selectedDepartments);
    if (updatedSelection.has(department)) {
      updatedSelection.delete(department);
    } else {
      updatedSelection.add(department);
      departmentData.find(d => d.department === department)?.sub_departments.forEach(subDept => updatedSelection.add(subDept));
    }
    setSelectedDepartments(updatedSelection);
  };

  const handleSelectSubDepartment = (department: string, subDepartment: string) => {
    const updatedSelection = new Set(selectedDepartments);
    if (updatedSelection.has(subDepartment)) {
      updatedSelection.delete(subDepartment);
    } else {
      updatedSelection.add(subDepartment);
    }

    const allSubDepartments = departmentData.find(d => d.department === department)?.sub_departments || [];
    const allSelected = allSubDepartments.every(subDept => updatedSelection.has(subDept));

    if (allSelected) {
      updatedSelection.add(department);
    } else {
      updatedSelection.delete(department);
    }

    setSelectedDepartments(updatedSelection);
  };

  return (
    <Container>
      <Typography variant="h4">Departments</Typography>
      <List>
        {departmentData.map((dept) => (
          <React.Fragment key={dept.department}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedDepartments.has(dept.department)}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleSelectDepartment(dept.department)}
                />
              </ListItemIcon>
              <ListItemText primary={dept.department} />
              <IconButton edge="end" onClick={() => handleExpandClick(dept.department)}>
                {expanded === dept.department ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            {expanded === dept.department && (
              <List component="div" disablePadding>
                {dept.sub_departments.map(subDept => (
                  <ListItem key={subDept} style={{ paddingLeft: 32 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedDepartments.has(subDept)}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleSelectSubDepartment(dept.department, subDept)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDept} />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default DepartmentList;
