/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2019 Ethinza Inc
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

// Content and logic of this file is highly influenced by following blog post:
// http://www.chrisj.cloud/?q=node/8

import cockpit from "cockpit";
import $ from "jquery";
import Config, { STORAGEC_EXE } from "./config.js";

var output = $("#output");
var result = $("#result");

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnPrepare").addEventListener("click", prepareHandler);
    document.getElementById("btnDeploy").addEventListener("click", deployHandler);

    main();
});

function main() {
    // Initialization work goes here.
    output.text("Trying helper " + STORAGEC_EXE);
}

function prepareHandler() {
    var tableId = "prepareTable";
    // cleanup previous table if any
    removeTable(tableId);

    var table = document.createElement("TABLE");
    table.setAttribute("id", tableId);
    table.setAttribute("class", "cockpit-form-table");
    document.body.appendChild(table);

    checkFqdn();
    var tr1 = "tr1";
    var td1 = "td1";
    createTableItem(table, tr1, td1);
    setTableItemSuccess(td1, "Check FQDN");
    createTableItem(table, "tr1e", "td1e");

    var tr2 = "tr2";
    var td2 = "td2";
    createTableItem(table, tr2, td2);
    setTableItemError(td2, "Check oVirt");
    createTableItem(table, "tr2e", "td2e");
}

function deployHandler() {
    // On click Code
    alert("deploy click");
}

function removeTable(id) {
    var tbl = document.getElementById(id);
    if (tbl) tbl.parentNode.removeChild(tbl);
}

function createTableItem(table, trId, tdId) {
    var tr = document.createElement("TR");
    tr.setAttribute("id", trId);
    table.appendChild(tr);

    addEmptyTableItem(tr);
    addTableCell(tr, tdId);
}

function addEmptyTableItem(tr) {
    var tdEmpty = document.createElement("TD");
    tdEmpty.setAttribute("width", "100");
    tdEmpty.appendChild(document.createTextNode(" "));
    tr.appendChild(tdEmpty);
}

function addTableCell(tr, tdId) {
    var td = document.createElement("TD");
    td.setAttribute("id", tdId);
    td.setAttribute("width", "250");
    tr.appendChild(td);
}

function setTableItemSuccess(tdId, text) {
    var td = document.getElementById(tdId);

    var img = document.createElement("IMG");
    img.setAttribute("src", "ok.png");
    img.setAttribute("alt", "success");
    td.appendChild(img);

    var txt = document.createTextNode(text);
    td.appendChild(txt);
}

function setTableItemError(tdId, text) {
    var td = document.getElementById(tdId);

    var img = document.createElement("IMG");
    img.setAttribute("src", "error.png");
    img.setAttribute("alt", "fail");
    td.appendChild(img);

    var txt = document.createTextNode(text);
    td.appendChild(txt);
}

function checkFqdn() {
    var hostsFile = cockpit.file("/etc/hosts", { superuser: "try" });

    hostsFile.read().done(function(text) {
        if (text) {
            var count = 0;
            // output.empty();

            text.split("\n").forEach(function(line) {
                ++count;
                output.append(document.createTextNode(count + ": "));
                line.split(" ").forEach(function(hosts) {
                    output.append(document.createTextNode(hosts + "  "));
                    Config.HostName = hosts;
                });
                output.append(document.createTextNode("\n"));
            });
        }
    });

    helperRun();
}

function helperRun() {
    output.text("About to execute helper " + Config.HelperExe);

    var proc = cockpit.spawn([Config.HelperExe]);

    proc.done(switchzSuccess);
    proc.stream(switchzOutput);
    proc.fail(switchzFail);

    result.empty();
    output.empty();
}

function switchzSuccess() {
    result.css("color", "green");
    result.text("success");
}

function switchzFail() {
    result.css("color", "red");
    result.text("fail");
}

function switchzOutput(data) {
    output.append(document.createTextNode(data));
}
