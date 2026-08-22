import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient, Gender, Diagnosis, Entry, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

import { Typography, Box, List, ListItem, ListItemText, Paper, Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

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

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const newEntry = await patientService.createEntry(id, values);
        setPatient({
          ...patient,
          entries: patient.entries.concat(newEntry as unknown as Entry),
        });
        setShowForm(false);
        setError(undefined);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && Array.isArray(e.response.data.error)) {
          const message = e.response.data.error.map((issue: { message: string }) => issue.message).join(", ");
          setError(message);
        } else if (typeof e?.response?.data?.error === "string") {
          setError(e.response.data.error);
        } else {
          setError("Failed to submit new entry.");
        }
      } else {
        setError("Unknown error occurred");
      }
    }
  };

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

      {showForm && (
  <AddEntryForm
    onSubmit={submitNewEntry}
    onCancel={() => setShowForm(false)}
    diagnoses={diagnoses}
    error={error}
  />
)}

      {!showForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
          sx={{ marginTop: 2 }}
        >
          Add New Entry
        </Button>
      )}

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