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
export const INSTALL_SH = '/usr/share/cockpit/storagec/install.sh';
export const STORAGEC_EXE = '/usr/share/cockpit/storagec/storagec';

// export const STORAGEC_CONF_FILE = '/etc/cockpit/machines-ovirt.config'; // relative URL for async download
export const VDSM_CONF_FILE = '/etc/vdsm/vdsm.conf';
export const PEM_FILE = '/etc/pki/vdsm/certs/cacert.pem';
export const STORAGEC_DEFAULT_PORT = 443;

const Config = {
    /**
     * Set to false to turn off the debug logging
     * See install.sh for production default.
     */
    Debug: true,

    OvirtFqdn: 'engine.soragec.ethinza',
    OvirtPort: 443,

    ConsoleClientResourceUrl: 'https://www.ovirt.org/documentation/admin-guide/virt/console-client-resources/',

    /**
     * oVirt polling is not called more than once per this time period.
     * Just single execution can be in progress at a time.
     * The delay window starts since previous polling processing is finished.
     * In ms.
     *
     * See install.sh for production default.
     */
    OvirtPollingInterval: 5000,
    CockpitPort: 9090,
    StoragecPort: 19007,

    HelperExe: STORAGEC_EXE,

    /**
     * If optional 'Virsh' property is provided here, it will be injected
     * to machines/config.js to adjust virsh connection parameters.
     *
     * See machines/config.js
     * See ovirt/configFuncs.js:readConfiguration()
     */
    Virsh: {
        Connections: null,
    },

    /**
     * oVirt SSO token, filled in login.js
     */
    Token: null,

    /**
         * The hostname found in configFuncs.js:doReadHostname required for auto calculating
         * the 'Virsh' connection URI property, if libvirt connection URI is not provided by oVirt config file.
         * The auto calculated libvirt URI is as follows: qemu+tls://${hostName}/system
         *
         * See ovirt/config.js
         * See ovirt/configFuncs.js:readConfiguration()
         */
    HostName: null,
};

export function getOvirtBaseUrl () {
    return `https://${Config.OvirtFqdn}:${Config.OvirtPort}/ovirt-engine`;
}

export default Config;
