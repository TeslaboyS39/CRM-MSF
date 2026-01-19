// Load all data
async function loadAllData() {
    try {
        const [custData, fleetData, custStatusData, fleetStatusData, taskData] = await Promise.all([
            supabase.from('customers').select('*').order('created_at', { ascending: false }),
            supabase.from('fleet').select('*').order('created_at', { ascending: false }),
            supabase.from('customer_statuses').select('*').order('sort_order'),
            supabase.from('fleet_statuses').select('*').order('sort_order'),
            supabase.from('tasks').select('*').order('created_at', { ascending: false })
        ]);
        return {
            customers: custData.data || [],
            fleet: fleetData.data || [],
            customerStatuses: custStatusData.data || [],
            fleetStatuses: fleetStatusData.data || [],
            tasks: taskData.data || []
        };
    } catch (error) {
        console.error('Error loading:', error);
        throw error;
    }
}

// Customer operations
async function saveCustomer(customerData) {
    const payload = {
        company_name: customerData.companyName,
        contact_person: customerData.contactPerson,
        location: customerData.location,
        acquisition_type: customerData.acquisitionType,
        estimated_revenue: parseInt(customerData.estimatedRevenue) || null,
        number_of_device: parseInt(customerData.numberOfDevice) || null,
        service_type: customerData.serviceType,
        classification_type: customerData.classificationType,
        terrain_type: customerData.terrainType,
        progress_status: customerData.progressStatus,
        start_date: customerData.startDate || null,
        expected_end_date: customerData.expectedEndDate || null,
        notes: customerData.notes
    };

    if (customerData.id) {
        // Update
        const { data, error } = await supabase
            .from('customers')
            .update(payload)
            .eq('id', customerData.id)
            .select();
        if (error) throw error;
        await addActivity('CUSTOMER_UPDATE', `Customer ${customerData.companyName} updated`);
        return data[0];
    } else {
        // Insert
        const { data, error } = await supabase
            .from('customers')
            .insert([payload])
            .select();
        if (error) throw error;
        await addActivity('CUSTOMER_ADD', `New customer ${customerData.companyName} added`);
        return data[0];
    }
}

async function deleteCustomer(id) {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) throw error;
}

// Fleet operations
async function saveFleet(fleetData) {
    const payload = {
        plate_number: fleetData.plateNumber.toUpperCase(),
        unit_brand: fleetData.unitBrand,
        vehicle_type: fleetData.vehicleType,
        customer_id: fleetData.customerId,
        fms_status: fleetData.fmsStatus,
        install_date: fleetData.installDate || null
    };

    if (fleetData.id) {
        const { data, error } = await supabase
            .from('fleet')
            .update(payload)
            .eq('id', fleetData.id)
            .select();
        if (error) throw error;
        await addActivity('FLEET_UPDATE', `Fleet ${fleetData.plateNumber} updated`);
        return data[0];
    } else {
        const { data, error } = await supabase
            .from('fleet')
            .insert([payload])
            .select();
        if (error) throw error;
        await addActivity('FLEET_ADD', `New fleet ${fleetData.plateNumber} added`);
        return data[0];
    }
}

async function deleteFleet(id) {
    const { error } = await supabase.from('fleet').delete().eq('id', id);
    if (error) throw error;
}

// Task operations
async function saveTask(taskData) {
    const payload = {
        customer_id: taskData.customerId,
        name: taskData.name,
        is_completed: taskData.isCompleted || false,
        due_date: taskData.dueDate || null
    };

    if (taskData.id) {
        const { data, error } = await supabase
            .from('tasks')
            .update(payload)
            .eq('id', taskData.id)
            .select();
        if (error) throw error;
        return data[0];
    } else {
        const { data, error } = await supabase
            .from('tasks')
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    }
}

async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
}

// Activity feed
async function addActivity(type, description) {
    await supabase.from('activity_feed').insert([{ type, description }]);
}