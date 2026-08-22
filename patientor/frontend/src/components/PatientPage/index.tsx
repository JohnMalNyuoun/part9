import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";
import { Typography, Box } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient = await patientService.getOne(id);
          setPatient(fetchedPatient);
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
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
      {/* Entries rendering will be added in upcoming steps */}
    </Box>
  );
};

export default PatientPage;