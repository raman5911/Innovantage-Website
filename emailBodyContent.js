module.exports = {
    freightContent: function(user) {
        return `
            <div class="outer-div">
                <h3>Shipment Details</h3>

                <div class="inner-div">
                    <p>
                        <b>Shipment type:</b> ${user.shipment_type != undefined ? user.shipment_type : " "}
                    </p>
                    <p>
                        <b>Delivery Incoterms:</b> ${user.delivery_incoterms != undefined ? user.delivery_incoterms : " "}
                    </p>
                    <p>
                        <b>Shipment Address:</b> ${user.shipment_address != undefined ? user.shipment_address : " "}
                    </p>
                    <p>
                        <b>ZIP/PIN Code:</b> ${user.code != undefined ? user.code : " "}
                    </p>
                    <p>
                        <b>Phone Number:</b> (+
                        ${user.shipment_country_code != undefined ? user.shipment_country_code : " "})
                        ${user.shipment_phone_number != undefined ? user.shipment_phone_number : " "}
                    </p>
                    <p>
                        <b>Shipment From:</b> ${user.shipment_from != undefined ? user.shipment_from : " "}
                    </p>
                    <p>
                        <b>Port of Origin:</b> ${user.origin_port != undefined ? user.origin_port : " "}
                    </p>
                    <p>
                        <b>Shipment To:</b> ${user.shipment_to != undefined ? user.shipment_to : " "}
                    </p>
                    <p>
                        <b>Destination Port:</b> ${user.destination_port != undefined ? user.destination_port : " "}
                    </p>
                    <p>
                        <b>Mode of Shipment:</b> ${user.shipment_mode != undefined ? user.shipment_mode : " "}
                    </p>
                </div>
            </div>
        
            <div class="outer-div">
                <h3>Commodity Details</h3>
                <div class="inner-div">
                    <p>
                        <b>Commodity Name:</b> ${user.commodity_name != undefined ? user.commodity_name : " "}
                    </p>
                    <p>
                        <b>Commodity Type:</b> ${user.commodity_type != undefined ? user.commodity_type : " "}
                    </p>
                    <p>
                        <b>Type of Containers / LCL Cargo:</b>
                        ${user.container_type != undefined ? user.container_type : " "}
                    </p>
                    <p>
                        <b>MSDS Report:</b>
                        <a href="${user.file_download_url != undefined ? user.file_download_url : " "}">Download File</a>
                    </p>
                </div>
            </div>
                            
            <div class="outer-div">
                <h3>Shipment Volume</h3>
                <div class="inner-div">
                    <p>
                        <b>Gross Weight (Kgs):</b> ${user.gross_weight != undefined ? user.gross_weight : " "}
                    </p>
                    <p>
                        <b>No. of Packages: </b>
                        ${user.number_of_packages != undefined ? user.number_of_packages : " "}
                    </p>
                    <p>
                        <b>Total Voume (CBM): </b>
                        ${user.total_volume != undefined ? user.total_volume : " "}
                    </p>
                </div>
            </div>
        </div>`;
    },

    customContent: function(user) {
        return `
            <div class="outer-div">
                <h3>Shipment Details</h3>

                <div class="inner-div">
                    <p>
                        <b>Shipment type:</b> ${user.shipment_type != undefined ? user.shipment_type : " "}
                    </p>
                    <p>
                        <b>Shipment Address:</b> ${user.shipment_address != undefined ? user.shipment_address : " "}
                    </p>
                    <p>
                        <b>ZIP/PIN Code:</b> ${user.code != undefined ? user.code : " "}
                    </p>
                    <p>
                        <b>Phone Number:</b> (+
                        ${user.shipment_country_code != undefined ? user.shipment_country_code : " "})
                        ${user.shipment_phone_number != undefined ? user.shipment_phone_number : " "}
                    </p>
                    <p>
                        <b>Shipment From:</b> ${user.shipment_from != undefined ? user.shipment_from : " "}
                    </p>
                    <p>
                        <b>Port of Origin:</b> ${user.origin_port != undefined ? user.origin_port : " "}
                    </p>
                    <p>
                        <b>Shipment To:</b> ${user.shipment_to != undefined ? user.shipment_to : " "}
                    </p>
                    <p>
                        <b>Destination Port:</b> ${user.destination_port != undefined ? user.destination_port : " "}
                    </p>
                    <p>
                        <b>Mode of Shipment:</b> ${user.shipment_mode != undefined ? user.shipment_mode : " "}
                    </p>
                </div>
            </div>

            <div class="outer-div">
                <h3>Commodity Details</h3>

                <div class="inner-div">
                    <p>
                        <b>Commodity Name:</b> ${user.commodity_name != undefined ? user.commodity_name : " "}
                    </p>
                    <p>
                        <b>Type of Containers / LCL Cargo:</b>
                        ${user.container_type != undefined ? user.container_type : " "}
                    </p>
                    <p>
                        <b>File Document :</b>
                        <a href="${user.file_download_url != undefined ? user.file_download_url : " "}">Download File</a>
                    </p>
                </div>
            </div>

            <div class="outer-div">
                <h3>Shipment Volume</h3>
                <div class="inner-div">
                    <p>
                        <b>Gross Weight (Kgs):</b> ${user.gross_weight != undefined ? user.gross_weight : " "}
                    </p>
                    <p>
                        <b>No. of Packages: </b>
                        ${user.number_of_packages != undefined ? user.number_of_packages : " "}
                    </p>
                    <p>
                        <b>Total Voume (CBM): </b>
                        ${user.total_volume != undefined ? user.total_volume : " "}
                    </p>
                    <p>
                        <b>Number of shipments per month: </b>
                        ${user.shipment_per_month != undefined ? user.shipment_per_month : " "}
                    </p>
                </div>
            </div>`;
    },

    transportContent: function(user) {
        return `
            <div class="outer-div">
                <h3>Shipment Details</h3>

                <div class="inner-div">
                    <p>
                        <b>Shipment Pickup Address:</b> ${user.pickup_address != undefined ? user.pickup_address : " "}
                    </p>
                    <p>
                        <b>Shipment Destination Address:</b> ${user.destination_address != undefined ? user.destination_address : " "}
                    </p>                            
                    <p>
                        <b>Vehicle Type:</b> ${user.vehicle_type != undefined ? user.vehicle_type : " "}
                    </p>
                    <p>
                        <b>Vehicle Size:</b> ${user.vehicle_size != undefined ? user.vehicle_size : " "}
                    </p>
                </div>
            </div>

            <div class="outer-div">
                <h3>Commodity Details</h3>

                <div class="inner-div">
                    <p>
                        <b>Unit Packing Type:</b> ${user.packing_type != undefined ? user.packing_type : " "}
                    </p>
                    <p>
                        <b>Other Specifications:</b> ${user.other_specs != undefined ? user.other_specs : " "}
                    </p>
                    <p>
                        <b>No. of Packages per Unit:</b> ${user.package_per_unit != undefined ? user.package_per_unit : " "}
                    </p>
                    <p>
                        <b>Each Package Weight (in Kg):</b> ${user.package_weight != undefined ? user.package_weight : " "}
                    </p>
                    <p>
                        <b>Shipment Weight (in Kg):</b> ${user.shipment_weight != undefined ? user.shipment_weight : " "}
                    </p>
                    <p>
                        <b>File Document :</b>
                        <a href="${user.file_download_url != undefined ? user.file_download_url : " "}">Download File</a>
                    </p>
                </div>
            </div>

            <div class="outer-div">
                <h3>Package Dimensions</h3>
                <div class="inner-div">
                    <p>
                        <b>Unit of Measurement:</b> ${user.measurement_unit != undefined ? user.measurement_unit : " "}
                    </p>
                    <p>
                        <b>Length: </b>
                        ${user.length != undefined ? user.length : " "}
                    </p>
                    <p>
                        <b>Width: </b>
                        ${user.width != undefined ? user.width : " "}
                    </p>
                    <p>
                        <b>Height: </b>
                        ${user.height != undefined ? user.height : " "}
                    </p>
                </div>
            </div>`;
    },

    warehouseContent: function(user) {
        return `
            <div class="outer-div">
                <h3>Requirement Details</h3>

                <div class="inner-div">
                    <p>
                        <b>Warehouse City:</b> ${user.warehouse_city != undefined ? user.warehouse_city : " "}
                    </p>
                    <p>
                        <b>Specific Location:</b> ${user.specific_location != undefined ? user.specific_location : " "}
                    </p>                            
                    <p>
                        <b>Required Covered Area (in SQFT):</b> ${user.covered_area != undefined ? user.covered_area : " "}
                    </p>
                    <p>
                        <b>Required Open Area (in SQFT):</b> ${user.open_area != undefined ? user.open_area : " "}
                    </p>
                    <p>
                        <b>Commodity Storage:</b> ${user.commodity_storage != undefined ? user.commodity_storage : " "}
                    </p>
                    <p>
                        <b>Infrastructure Requirement:</b> ${user.infrastructure_options != undefined ? user.infrastructure_options : " "}
                    </p>
                    <p>
                        <b>Manpower Requirement:</b> ${user.manpower_options != undefined ? user.manpower_options : " "}
                    </p>
                    <p>
                        <b>Security Personnel / CCTV Requirement</b> ${user.security_options != undefined ? user.security_options : " "}
                    </p>
                    <p>
                        <b>Other Infrastucture Requirements:</b> ${user.other_requirements != undefined ? user.other_requirements : " "}
                    </p>
                    <p>
                        <b>Scope of Work:</b> ${user.work_scope != undefined ? user.work_scope : " "}
                    </p>
                    <p>
                        <b>File Document :</b>
                        <a href="${user.file_download_url != undefined ? user.file_download_url : " "}">Download File</a>
                    </p>
                </div>
            </div>`;
    },

    valueAddedContent: function(user) {
        return `
            <div class="outer-div">
                <h3>Service Specification</h3>

                <div class="inner-div">
                    <p>
                        <b>Type of Value Addded Service :</b> ${user.service_type != undefined ? user.service_type : " "}
                    </p>
                    <p>
                        <b>Catalog / Technical Specification File :</b>
                        <a href="${user.file_download_url != undefined ? user.file_download_url : " "}">Download File</a>
                    </p>
                </div>
            </div>`;
    }
};