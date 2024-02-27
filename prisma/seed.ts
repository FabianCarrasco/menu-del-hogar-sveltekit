import { Console } from "console"
import {FoodKeeper} from "../src/lib/types/FoodKeeper"
import {Prisma, PrismaClient} from '@prisma/client'

const getData = async () => {
    const response = await fetch('https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json')
    const data = await response.json()
    return data as FoodKeeper
}

const fetchAndAssignData = async () => {
    let data: FoodKeeper

    try {
        data = await getData()
        
        await populateCategory(data)
            .catch((error) => {
                console.error("Unhandled error: ", error)
            })
        await populateDatabase(data)
            .catch((error) => {
                console.error("Unhandled error: ", error)
            })
        await populateCookingTips(data)
            .catch((error) => {
                console.error("Unhandled error: ", error)
            })
        await populateCookingMethods(data)
            .catch((error) => {
                console.error("Unhandled error: ", error)
            })
    } catch (error) {
        console.log('\nError fetching data: ', error)
    }
}

const populateCookingTips = async (foodKeeper: FoodKeeper) => {
    const prisma = new PrismaClient()

    const productIDs = new Set(foodKeeper.sheets[2].data.map(product => product[0].ID))
    const nonExistentProductData = foodKeeper.sheets[3].data.filter(tip => !productIDs.has(tip[1].Product_ID))

    try {
        await prisma.$connect()
        // foodKeeper.sheets[3].data.forEach(async (cookingTip, i) => {
        for (const cookingTip of foodKeeper.sheets[3].data) {

            const existsInNonExistant = nonExistentProductData.some(dataItem => dataItem[0].ID === cookingTip[0].ID)

            if(existsInNonExistant) {
                continue;
            } else {
                console.log(existsInNonExistant)
            }

            const record = await prisma.cookingTips.create({
                data: {
                    id: cookingTip[0].ID,
                    tips: cookingTip[2]?.Tips || null,
                    safe_minimum_temperature: cookingTip[3]?.Safe_Minimum_Temperature || null,
                    rest_time: cookingTip[4]?.Rest_Time || null,
                    rest_time_metric: cookingTip[5]?.Rest_Time_Metric || null,

                    product: {
                        connect: {
                            id: cookingTip[1].Product_ID
                        }
                    }
                }
            })

            console.log('Cooking tip created: ', record.product_id)
        }
    } catch (error) {
        console.log('\nError: ', error)
    } finally {
        await prisma.$disconnect()
    }
}

const populateCookingMethods = async (foodKeeper: FoodKeeper) => {
    const prisma = new PrismaClient()

    try {
        await prisma.$connect()
        foodKeeper.sheets[4].data.forEach(async (cookingMethod, i) => {

            const record = await prisma.cookingMethods.create({
                data: {
                    id: cookingMethod[0].ID,
                    cooking_method: cookingMethod[2].Cooking_Method,
                    measure_from: cookingMethod[3]?.Measure_from || null,
                    measure_to: cookingMethod[4]?.Measure_to || null,
                    size_metric: cookingMethod[5]?.Size_metric || null,
                    cooking_temperature: 
                        (
                            typeof cookingMethod[6]?.Cooking_Temperature == 'number' ?
                                cookingMethod[6]?.Cooking_Temperature.toString() :
                                cookingMethod[6]?.Cooking_Temperature
                        ) || null,
                    timing_from: cookingMethod[7]?.Timing_from || null,
                    timing_to: cookingMethod[8]?.Timing_to || null,
                    timing_metric: cookingMethod[9]?.Timing_metric || null,
                    timing_per: cookingMethod[10]?.Timing_per || null,

                    product: {
                        connect: {
                            id: cookingMethod[1].Product_ID
                        }
                    }
                }
            })

            console.log('Cooking method created: ', record.product_id)
        })
    } catch (error) {
        console.error('\nError: ', error.message)

        if(error.code === 'P2025') {
            console.error('The problematic value: ', error.meta.target)
        }
    } finally {
        await prisma.$disconnect()
    }
}

const populateCategory = async (foodKeeper: FoodKeeper) => {
    const prisma = new PrismaClient()

    try {
        await prisma.$connect()
        foodKeeper.sheets[1].data.forEach(async (category, i) => {

            const record = await prisma.category.create({
                data: {
                    id: category[0].ID,
                    category_name: category[1].Category_Name,
                    subcategory_name: category[2].Subcategory_Name
                }
            })

            console.log('Category created: ', record.category_name)
        })
    } catch (error) {
        console.log('\nError: ', error)
    } finally {
        await prisma.$disconnect()
    }
}

const populateDatabase = async (foodKeeper: FoodKeeper) => {
    const prisma = new PrismaClient()

    try {
        await prisma.$connect()
        foodKeeper.sheets[2].data.forEach(async (product, i) => {
            if(typeof product[27]?.Refrigerate_After_Thawing_Min === 'string') {
                product[27].Refrigerate_After_Thawing_Min = null
            }

            const record = await prisma.product.create({
                data: {
                    id: product[0].ID,
                    name: product[2].Name,
                    name_subtitle: product[3].Name_subtitle || null,
                    keywords: product[4]?.Keywords || null,
                    pantry_min: (product[5]?.Pantry_Min || product[9]?.DOP_Pantry_Min) || null,
                    pantry_max: (product[6]?.Pantry_Max || product[10]?.DOP_Pantry_Max) || null,
                    pantry_metric: (product[7]?.Pantry_Metric || product[11]?.DOP_Pantry_Metric) || null,
                    pantry_tips: (product[8]?.Pantry_tips || product[12]?.DOP_Pantry_tips) || null,
                    pantry_after_opening_min: product[13]?.Pantry_After_Opening_Min || null,
                    pantry_after_opening_max: product[14]?.Pantry_After_Opening_Max || null,
                    pantry_after_opening_metric: product[15]?.Pantry_After_Opening_Metric || null,
                    refrigerate_min: (product[16]?.Refrigerate_Min || product[20]?.DOP_Refrigerate_Min) || null,
                    refrigerate_max: (product[17]?.Refrigerate_Max || product[21]?.DOP_Refrigerate_Max) || null,
                    refrigerate_metric: (product[18]?.Refrigerate_Metric || product[22]?.DOP_Refrigerate_Metric) || null,
                    refrigerate_tips: (product[19]?.Refrigerate_tips || product[23]?.DOP_Refrigerate_tips) || null,
                    refrigerate_after_opening_min: product[24]?.Refrigerate_After_Opening_Min || null,
                    refrigerate_after_opening_max: product[25]?.Refrigerate_After_Opening_Max || null,
                    refrigerate_after_opening_metric: product[26]?.Refrigerate_After_Opening_Metric || null,
                    refrigerate_after_thawing_min: product[27]?.Refrigerate_After_Thawing_Min || null,
                    refrigerate_after_thawing_max: product[28]?.Refrigerate_After_Thawing_Max || null,
                    refrigerate_after_thawing_metric: product[29]?.Refrigerate_After_Thawing_Metric || null,
                    freeze_min: (product[30]?.Freeze_Min || product[34]?.DOP_Freeze_Min) || null,
                    freeze_max: (product[31]?.Freeze_Max || product[35]?.DOP_Freeze_Max) || null,
                    freeze_metric: (product[32]?.Freeze_Metric || product[36]?.DOP_Freeze_Metric) || null,
                    freeze_tips: (product[33]?.Freeze_Tips || product[37]?.DOP_Freeze_Tips) || null,

                    category: {
                        connect: {
                            id: product[1].Category_ID
                        }
                    }
                }
            })

            console.log('Product created: ', record.name, ' ', record.id)
        })
    } catch (error) {
        console.error('\nError: ', error)
        console.log('\nERROR ', error)
    } finally {
        await prisma.$disconnect()
    }
}

await fetchAndAssignData()