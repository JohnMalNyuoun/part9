import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis, Entry } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

import { Typography, Box, List, ListItem, ListItemText, Paper } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDiagnoses = await diagnosisService.getAll();
        setDiagnoses(fetchedDiagnoses);

        if (id) {
          const fetchedPatient = await patientService.getOne(id);
          setPatient(fetchedPatient);
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchData();
  }, [id]);

  if (!patient) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : "";
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "10px" }}>
        {patient.name} {getGenderIcon(patient.gender)}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h5" style={{ marginTop: "20px", fontWeight: "bold" }}>
        entries
      </Typography>

      {patient.entries.map((entry: Entry) => (
        <Paper key={entry.id} variant="outlined" sx={{ padding: 2, marginTop: 2, marginBottom: 2 }}>
          <EntryDetails entry={entry} />
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <List dense>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code} disablePadding>
                  <ListItemText
                    primary={`${code} ${getDiagnosisName(code)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default PatientPage;