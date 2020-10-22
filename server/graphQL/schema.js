const graphql = require('graphql')
const graphqldate = require('graphql-iso-date');
const prisma = require('./PrismaClient');

const {
    GraphQLDateTime
} = graphqldate
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema } = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        registration_date: { type: GraphQLDateTime },
        profile_image_link: { type: GraphQLString },
        new_user: { type: GraphQLBoolean },
        applications: {
            type: new GraphQLList(ApplicationType),
            resolve(parent, args) {
                return prisma.applications.findMany({ where: { user_id: parent.id } })
            }
        },
        accepted_applications: {
            type: new GraphQLList(ApplicationType),
            resolve(parent, args) {
                return prisma.applications.findMany({ where: { user_id: parent.id, accepted: true } })
            }
        },
        shifts: {
            type: new GraphQLList(ShiftType),
            async resolve(parent, args) {
                applications = await prisma.applications.findMany({ where: { user_id: parent.id, accepted: true }, select: { shift_id: true } });
                if (applications.length === 0) return null;
                return await prisma.shifts.findMany({ where: { id: { in: applications.map(app => app.shift_id) } } })
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                return prisma.messages.findMany({ where: { user_id: parent.id, destination: "user" } });
            }
        }
    })
})


const BusinessType = new GraphQLObjectType({
    name: 'Business',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        business_email: { type: GraphQLString },
        street_address: { type: GraphQLString },
        postal_code: { type: GraphQLString },
        city: { type: GraphQLString },
        province: { type: GraphQLString },
        country: { type: GraphQLString },
        logo_link: { type: GraphQLString },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                return prisma.messages.findMany({ where: { business_id: parent.id, destination: 'business' } })
            }
        },
        shifts: {
            type: new GraphQLList(ShiftType),
            resolve(parent, args) {
                return prisma.shifts.findMany({ where: { business_id: parent.id } })
            }
        }
    })
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        business_id: { type: GraphQLInt },
        destination: { type: GraphQLString },
        message: { type: GraphQLString },
        message_sent: { type: GraphQLDateTime },
        message_read: { type: GraphQLBoolean },
        message_read_time: { type: GraphQLDateTime },
        is_system_notification: { type: GraphQLBoolean },
        business: {
            type: BusinessType,
            resolve(parent, args) {
                return prisma.businesses.findOne({ where: { id: parent.business_id } })
            }
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return prisma.users.findOne({ where: { id: parent.user_id } })
            }
        }
    })
})

const ShiftType = new GraphQLObjectType({
    name: 'Shift',
    fields: () => ({
        id: { type: GraphQLInt },
        business_id: { type: GraphQLInt },
        start_time: { type: GraphQLDateTime },
        end_time: { type: GraphQLDateTime },
        role: { type: GraphQLString },
        rate: { type: GraphQLFloat },
        posting_fee: { type: GraphQLFloat },
        pending: { type: GraphQLBoolean },
        business: {
            type: BusinessType,
            resolve(parent, args) {
                return prisma.businesses.findOne({ where: { id: parent.business_id } })
            }
        },
        applications: {
            type: new GraphQLList(ApplicationType),
            resolve(parent, args) {
                return prisma.applications.findMany({ where: { shift_id: parent.id } })
            }
        },
        pendingApplications: {
            type: new GraphQLList(ApplicationType),
            resolve(parent, args) {
                return prisma.applications.findMany({ where: { shift_id: parent.id, reviewed: false } });
            }
        },
        user: {
            type: UserType,
            async resolve(parent, args) {
                if (!parent.pending) {
                    console.log(parent)
                    let application = await prisma.applications.findMany({ where: { shift_id: parent.id, accepted: true }, select: { user_id: true } });
                    console.log(application)
                    if (application.length === 0 || application.length > 1) return null;
                    return await prisma.users.findOne({ where: { id: application[0].user_id } });
                } else {
                    return null;
                }
            }
        }
    })
})

const ApplicationType = new GraphQLObjectType({
    name: 'Application',
    fields: () => ({
        id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        shift_id: { type: GraphQLInt },
        applied_on: { type: GraphQLDateTime },
        application_message: { type: GraphQLString },
        accepted: { type: GraphQLBoolean },
        reviewed: { type: GraphQLBoolean },
        user: {
            type: UserType,
            resolve(parent, args) {
                return prisma.users.findOne({ where: { id: parent.user_id } });
            }
        },
        shift: {
            type: ShiftType,
            resolve(parent, args) {
                return prisma.shifts.findOne({ where: { id: parent.shift_id } });
            }
        },
        business: {
            type: BusinessType,
            async resolve(parent, args) {
                let applicationBusinessID = await prisma.shifts.findOne({ where: { id: parent.shift_id }, select: { business_id: true } });
                return await prisma.businesses.findOne({ where: { id: applicationBusinessID.business_id } })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.users.findOne({ where: { id: args.id } })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return prisma.users.findMany();
            }
        },
        userShifts: {
            type: new GraphQLList(ShiftType),
            args: { id: { type: GraphQLInt } },
            async resolve(parent, args) {
                let applications = await prisma.applications.findMany({ where: { user_id: args.id, accepted: true }, select: { shift_id: true } });
                return await prisma.shifts.findMany({ where: { id: { in: applications.map((application) => application.shift_id) } } })
            }
        },
        userNextShifts: {
            type: new GraphQLList(ShiftType),
            args: {
                id: { type: GraphQLInt },
                date: { type: GraphQLDateTime }
            },
            async resolve(parent, args) {
                let applications = await prisma.applications.findMany({ where: { user_id: args.id, accepted: true }, select: { shift_id: true } });
                return await prisma.shifts.findMany({ where: { id: { in: applications.map((application) => application.shift_id) }, start_time: { gte: new Date(args.date) } }, orderBy: { start_time: 'asc' } })
            }
        },
        userCompletedShifts: {
            type: new GraphQLList(ShiftType),
            args: { id: { type: GraphQLInt } },
            async resolve(parent, args) {
                let applications = await prisma.applications.findMany({ where: { user_id: args.id, accepted: true }, select: { shift_id: true } });
                return await prisma.shifts.findMany({ where: { id: { in: applications.map((application) => application.shift_id) }, start_time: { lte: new Date() }, pending: false } })
            }
        },
        business: {
            type: BusinessType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.businesses.findOne({ where: { id: args.id } })
            }
        },
        businesses: {
            type: new GraphQLList(BusinessType),
            resolve(parent, args) {
                return prisma.businesses.findMany();
            }
        },
        businessUpcomingShifts: {
            type: new GraphQLList(ShiftType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.shifts.findMany({ where: { business_id: args.id, pending: false, start_time: { gte: new Date() } } });
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLInt }, },
            resolve(parent, args) {
                return prisma.messages.findOne({ where: { id: args.id } })
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            args: {
                id: { type: GraphQLInt },
                destination: { type: GraphQLString }
            },
            async resolve(parent, args) {
                if (args.destination === "user") {
                    return await prisma.messages.findMany({ where: { user_id: args.id, destination: args.destination } });
                } else {
                    return await prisma.messages.findMany({ where: { business_id: args.id, destination: args.destination } });
                }
            }
        },
        shift: {
            type: ShiftType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.shifts.findOne({ where: { id: args.id } })
            }
        },
        shifts: {
            type: new GraphQLList(ShiftType),
            resolve(parent, args) {
                return prisma.shifts.findMany();
            }
        },
        businessShifts: {
            type: new GraphQLList(ShiftType),
            args: {
                id: { type: GraphQLInt },
                pendingOnly: { type: GraphQLBoolean },
                futureOnly: { type: GraphQLBoolean }
            },
            async resolve(parent, args) {
                if (args.pendingOnly && args.futureOnly) return prisma.shifts.findMany({ where: { business_id: args.id, pending: true, start_time: { gte: new Date() } } });
                if (args.pendingOnly && !args.futureOnly) return prisma.shifts.findMany({ where: { business_id: args.id, pending: true } });
                if (!args.pendingOnly && args.futureOnly) return prisma.shifts.findMany({ where: { business_id: args.id, start_time: { gte: new Date() } } });
                if (!args.pendingOnly && !args.futureOnly) return prisma.shifts.findMany({ where: { business_id: args.id } });
            }
        },
        pendingShifts: {
            type: new GraphQLList(ShiftType),
            args: { userID: { type: GraphQLInt } },
            async resolve(parent, args) {
                let applicationsList = await prisma.applications.findMany({ where: { user_id: args.userID }, select: { shift_id: true } })
                console.log(applicationsList)
                return await prisma.shifts.findMany({
                    where: { pending: true, start_time: { gte: new Date() }, NOT: { id: { in: applicationsList.map(app => app.shift_id) } } }, orderBy: {
                        start_time: 'asc'
                    }
                });
            }
        },
        businessInvoicedShifts: {
            type: new GraphQLList(ShiftType),
            args: { businessID: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.shifts.findMany({ where: { business_id: args.businessID, pending: false, start_time: { lte: new Date() } } });
            }
        },
        application: {
            type: ApplicationType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.applications.findOne({ where: { id: args.id } })
            }
        },
        applications: {
            type: new GraphQLList(ApplicationType),
            resolve(parent, args) {
                return prisma.applications.findMany();
            }
        },
        pendingApplications: {
            type: new GraphQLList(ApplicationType),
            args: { userID: { type: GraphQLInt } },
            async resolve(parent, args) {
                pendingShifts = await prisma.shifts.findMany({ where: { pending: true, start_time: { gte: new Date() } }, select: { id: true } })
                return await prisma.applications.findMany({ where: { user_id: args.userID, reviewed: false, shift_id: { in: pendingShifts.map(shift => shift.id) } } });
            }
        },
        businessApplications: {
            type: new GraphQLList(ApplicationType),
            args: {
                id: { type: GraphQLInt },
                pendingOnly: { type: GraphQLBoolean },
                upcomingShifts: { type: GraphQLBoolean },
            },
            async resolve(parent, args) {
                if (args.upcomingShifts) {
                    businessShifts = await prisma.shifts.findMany({ where: { business_id: args.id, start_time: { gte: new Date() }, pending: true }, select: { id: true } });
                } else {
                    businessShifts = await prisma.shifts.findMany({ where: { business_id: args.id }, select: { id: true }, pending: true });
                }
                if (args.pending) {
                    return await prisma.applications.findMany({ where: { shift_id: { in: businessShifts.map(shift => shift.id) }, reviewed: false } });
                } else {
                    return await prisma.applications.findMany({ where: { shift_id: { in: businessShifts.map(shift => shift.id) } } });
                }

            }
        },
        acceptedApplications: {
            type: new GraphQLList(ApplicationType),
            args: { userID: { type: GraphQLInt } },
            resolve(parent, args) {
                return prisma.applications.findMany({ where: { user_id: args.userID, accepted: true, shifts: { start_time: { gte: new Date() }, pending: false } } })
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createShift: {
            type: ShiftType,
            args: {
                business_id: { type: new GraphQLNonNull(GraphQLInt) },
                start_time: { type: new GraphQLNonNull(GraphQLDateTime) },
                end_time: { type: new GraphQLNonNull(GraphQLDateTime) },
                role: { type: new GraphQLNonNull(GraphQLString) },
                rate: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                return prisma.shifts.create({
                    data: {
                        start_time: args.start_time,
                        end_time: args.end_time,
                        role: args.role,
                        rate: args.rate,
                        posting_fee: 2.99,
                        pending: true,
                        businesses: {
                            connect: { id: args.business_id }
                        }
                    }
                });
            }
        },
        createApplication: {
            type: ApplicationType,
            args: {
                user_id: { type: new GraphQLNonNull(GraphQLInt) },
                shift_id: { type: new GraphQLNonNull(GraphQLInt) },
                application_message: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return prisma.applications.create({
                    data: {
                        applied_on: new Date(),
                        application_message: args.application_message,
                        accepted: false,
                        reviewed: false,
                        shifts: {
                            connect: { id: args.shift_id }
                        },
                        users: {
                            connect: { id: args.user_id }
                        }
                    }
                })
            }
        },
        reviewApplication: {
            type: ApplicationType,
            args: {
                shift_id: { type: new GraphQLNonNull(GraphQLInt) },
                applicationID: { type: new GraphQLNonNull(GraphQLInt) },
                accepted: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            async resolve(parent, args) {
                if (args.accepted) {
                    await prisma.shifts.update({
                        where: { id: args.shift_id },
                        data: {
                            pending: false
                        }
                    })
                    return await prisma.applications.update({
                        where: { id: args.applicationID },
                        data: {
                            reviewed: true,
                            accepted: args.accepted
                        }
                    })
                } else {
                    return await prisma.applications.update({
                        where: { id: args.applicationID },
                        data: {
                            reviewed: true,
                            accepted: args.accepted
                        }
                    })
                }

            }
        },
        markMessageRead: {
            type: MessageType,
            args: { messageID: { type: new GraphQLNonNull(GraphQLInt) } },
            async resolve(parent, args) {
                return await prisma.messages.update({
                    where: { id: args.messageID },
                    data: {
                        message_read: true,
                        message_read_time: new Date()
                    }
                })
            }
        },
        updateUser: {
            type: UserType,
            args: {
                first_name: { type: new GraphQLNonNull(GraphQLString) },
                last_name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                return await prisma.users.update({
                    where: { email: args.email },
                    data: {
                        first_name: args.first_name,
                        last_name: args.last_name,
                        new_user: false
                    }
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});





