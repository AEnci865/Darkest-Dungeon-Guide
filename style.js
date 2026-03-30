body {
  background: #121212;
  color: #eee;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.nav-tab {
  margin: 5px;
  padding: 8px 12px;
  background: #222;
  color: #ccc;
  border: none;
  cursor: pointer;
}

.nav-tab.active {
  background: #444;
  color: white;
}

.tab-pane {
  display: none;
  margin-top: 20px;
}

.tab-pane.active {
  display: block;
}

.hero-card {
  border: 1px solid #444;
  padding: 10px;
  margin: 10px 0;
}

.queue-item {
  border: 1px solid #333;
  margin: 5px 0;
  padding: 10px;
}

.priority-critical { border-left: 5px solid red; }
.priority-high { border-left: 5px solid orange; }
.priority-medium { border-left: 5px solid yellow; }
.priority-low { border-left: 5px solid gray; }