/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2019 Ethinza Inc.
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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnPrepare").addEventListener("click", prepareHandler);
    document.getElementById("btnDeploy").addEventListener("click", deployHandler);

    main();
});

function main() {
    // Initialization work goes here.
}

function prepareHandler() {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "tblPrepare");
    document.body.appendChild(x);

    var y = document.createElement("TR");
    y.setAttribute("id", "trOk");
    document.getElementById("tblPrepare").appendChild(y);

    var z = document.createElement("TD");
    z.setAttribute("id", "tdOk");
    var img = document.createElement("IMG");
    img.setAttribute("src", "ok.png");
    img.setAttribute("alt", "ok");
    z.appendChild(img);
    var t = document.createTextNode("Check FQDN");
    z.appendChild(t);
    document.getElementById("trOk").appendChild(z);

    alert("prepare click");
}

function deployHandler() {
    // On click Code
    alert("deploy click");
}
