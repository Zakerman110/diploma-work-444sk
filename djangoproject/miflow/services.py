import pickle
import pandas as pd
import numpy as np
import os
from sklearn.preprocessing import LabelEncoder
import lightgbm as lgb

models_path = os.path.join(os.getcwd(), 'miflow', 'ai', 'models')


def predict_internal_migration(start_date, end_date):
    model = load_pickle(os.path.join(models_path, 'ukraine_internal_mig_lgbm.sav'))
    place_label_encoder = load_pickle(os.path.join(models_path, 'ukraine_internal_mig_lgbm_oblast_encoder.sav'))
    gender_label_encoder = load_pickle(os.path.join(models_path, 'ukraine_internal_mig_lgbm_gender_encoder.sav'))
    df = generate_internal_migration_df(start_date, end_date, place_label_encoder, gender_label_encoder)
    net_migration = predict_net_internal_migration(df, model, place_label_encoder)
    return net_migration


def load_pickle(path):
    with open(path, 'rb') as f:
        model = pickle.load(f)
    return model


def generate_internal_migration_df(start_date, end_date, origin_label_encoder, gender_label_encoder):
    # Generate date range
    date_range = pd.date_range(start_date, end_date, freq='MS')

    # Create DataFrame skeleton
    df = pd.DataFrame()

    # Add Origin column using the origin label encoder
    origins = origin_label_encoder.inverse_transform(range(len(origin_label_encoder.classes_)))
    df['Oblast'] = origins

    # Add Year and Month columns
    df['Year'] = [date_range.year] * len(df)
    df['Month'] = [date_range.month] * len(df)
    df = df.explode(['Year', 'Month'], ignore_index=True)

    # Add Gender column using the gender label encoder
    genders = gender_label_encoder.inverse_transform(range(len(gender_label_encoder.classes_)))
    df['Gender'] = [genders] * len(df)
    df = df.explode('Gender', ignore_index=True)

    # Split each row to add Destination from Origin, excluding self-mapping
    df['Destination'] = [origins] * len(df)
    df = df.explode('Destination', ignore_index=True)

    df = df.drop(df[df['Oblast'] == df['Destination']].index)
    df = df.reset_index(drop=True)

    # Transforming
    df['Oblast'] = origin_label_encoder.transform(df['Oblast'])
    df['Destination'] = origin_label_encoder.transform(df['Destination'])
    df['Gender'] = gender_label_encoder.transform(df['Gender'])
    df = df.astype(np.int16)
    print(df.info())

    return df


def predict_net_internal_migration(df, model, origin_label_encoder):
    # Select relevant columns
    selected_df = df[['Oblast', 'Year', 'Month', 'Gender', 'Destination']]

    # Make predictions using the model
    predictions = model.predict(selected_df)

    selected_df['Migration'] = predictions

    migration = selected_df.groupby('Oblast')['Migration'].sum()
    immigration = selected_df.groupby('Destination')['Migration'].sum()

    result_df = pd.DataFrame({'Oblast': migration.index, 'Migration': migration.values})
    result_df['Immigration'] = immigration.values
    result_df['Oblast'] = origin_label_encoder.inverse_transform(result_df['Oblast'])

    return result_df


def predict_external_migration(model_name, start_date, end_date):
    model = load_pickle(os.path.join(models_path, model_name))
    place_label_encoder = load_pickle(os.path.join(models_path, 'ukraine_inter_encoder.sav'))
    df = generate_external_migration_df(start_date, end_date, place_label_encoder)
    net_migration = predict_net_external_migration(df, model, place_label_encoder)
    return net_migration


def generate_external_migration_df(start_date, end_date, origin_label_encoder):
    # Generate date range
    date_range = pd.date_range(start_date, end_date, freq='YS')

    # Create DataFrame skeleton
    df = pd.DataFrame()

    # df['Country of origin'] = [country]

    # Split each row to add Destination from Origin, excluding self-mapping
    origins = origin_label_encoder.inverse_transform(range(len(origin_label_encoder.classes_)))
    df['Origin'] = [origins]
    df = df.explode('Origin', ignore_index=True)

    # Add Year and Month columns
    df['Year'] = [date_range.year] * len(df)
    df = df.explode('Year', ignore_index=True)

    # df = df.drop(df[df['Country of origin'] == df['Country of asylum']].index)
    # df = df.reset_index(drop=True)

    # df_migration = df.copy()
    # df_migration['Country of origin'] = df['Country of asylum']
    # df_migration['Country of asylum'] = country
    # df = pd.concat([df, df_migration])

    # Transforming
    df['Origin'] = origin_label_encoder.transform(df['Origin'])
    # df['Country of asylum'] = origin_label_encoder.transform(df['Country of asylum'])
    df = df.astype(np.int16)
    print(df.info())

    return df


def predict_net_external_migration(df, model, origin_label_encoder):
    # Select relevant columns
    selected_df = df[['Origin', 'Year']]

    # Make predictions using the model
    predictions = model.predict(selected_df)

    selected_df['Migration'] = predictions

    selected_df['Origin'] = origin_label_encoder.inverse_transform(selected_df['Origin'])
    # selected_df['Country of asylum'] = origin_label_encoder.inverse_transform(selected_df['Country of asylum'])

    summed_migration = selected_df.groupby(['Origin'])['Migration'].sum().reset_index()

    # new_column_names = {'Country of origin': 'Origin', 'Country of asylum': 'Destination'}
    # summed_migration = summed_migration.rename(columns=new_column_names)

    return summed_migration
