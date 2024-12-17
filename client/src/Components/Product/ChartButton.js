import { useState } from "react";
import BarChartTwoToneIcon from "@mui/icons-material/StackedBarChartTwoTone";
import PieChartOutlineTwoToneIcon from "@mui/icons-material/PieChartOutlineTwoTone";
import TrackChangesSharpIcon from "@mui/icons-material/TrackChangesSharp";
import TrafficRoundedIcon from "@mui/icons-material/TrafficRounded";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "react-bootstrap/Modal";
import { Row, Col, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PieChart from "../Visualization/Pie/PieChart.js";
import PolarChart from "../Visualization/Polar/PolarChart.js";
import BarChart from "../Visualization/Bar/BarChart.js";
import TrafficLight from "../Visualization/Traffic Light System/TrafficLight.js";
import ColorSwitches from "../Visualization/Switch/ColorSwitches.js";
import { FormControlLabel } from "@mui/material";
import "./ChartButton.css";

const ChartButton = ({ productId }) => {
  const [show, setShow] = useState(false);
  const [chartType, setChartType] = useState(null);
  const [showPerContainer, setShowPerContainer] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (type) => {
    setChartType(type);
    setShow(true);
  };

  const navigate = useNavigate();

  const handleAllClick = () => {
    navigate(`/dv/${productId}`);
  };

  const handleSwitchChange = (checked) => {
    setShowPerContainer(checked);
  };

  const getModalClassName = () => {
    switch (chartType) {
      case "bar":
        return "modal-bar";
      case "pie":
        return "modal-pie";
      case "polar":
        return "modal-polar";
      case "traffic":
        return "modal-traffic";
      default:
        return "";
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <IconButton
          style={{ color: "#7D9F00" }}
          // color="warning"
          size="large"
          onClick={() => handleShow("bar")}
        >
          <BarChartTwoToneIcon fontSize="large" />
        </IconButton>
        <IconButton
          // color="warning"
          style={{ color: "#7D9F00" }}
          size="large"
          onClick={() => handleShow("pie")}
        >
          <PieChartOutlineTwoToneIcon fontSize="large" />
        </IconButton>
        {/* <IconButton
          color="warning"
          size="large"
          onClick={() => handleShow("polar")}
        >
          <TrackChangesSharpIcon fontSize="large" />
        </IconButton> */}
        <IconButton
          // color="warning"
          style={{ color: "#7D9F00" }}
          size="large"
          onClick={() => handleShow("traffic")}
        >
          <TrafficRoundedIcon fontSize="large" />
        </IconButton>
        <Link to={`/dv/${productId}`} style={{ marginTop: "0.5rem" }}>
          <Button
            size="large"
            style={{ borderColor: "#7D9F00", color: "#7D9F00" }}
            // color="warning"
            variant="outlined"
            onClick={handleAllClick}
          >
            All
          </Button>
        </Link>
      </Stack>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName={getModalClassName()}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="chart-container">
              {chartType === "bar" && (
                <BarChart showPerContainer={showPerContainer} />
              )}
              {chartType === "pie" && (
                <PieChart showPerContainer={showPerContainer} />
              )}
              {chartType === "polar" && (
                <PolarChart showPerContainer={showPerContainer} />
              )}
              {chartType === "traffic" && (
                <TrafficLight showPerContainer={showPerContainer} />
              )}
            </Col>
            <Col className="form-container">
              <FormGroup>
                <FormControlLabel
                  control={<ColorSwitches onToggle={handleSwitchChange} />}
                  label="Per Container"
                />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChartButton;
